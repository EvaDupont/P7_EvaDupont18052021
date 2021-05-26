const token = require("../middleware/token"); /* module qui génère le token*/
const db = require("../models"); /*lien entre BDD et models*/
const fs = require("fs"); /*package qui permet de modifier ou supprimer des fichiers */

/*requete pour afficher tout les posts*/
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await db.Post.findAll({
      attributes: ["id", "message", "imageUrl", "link", "createdAt"],
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.User,
          attributes: ["pseudo", "id", "photo"],
        },
        {
          model: db.Like,
          attributes: ["UserId"],
        },
        {
          model: db.Comment,
          attributes: ["message", "pseudo", "UserId", "id"],
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: db.User,
              attributes: ["photo", "pseudo"],
            },
          ],
        },
      ],
    });
    res.status(200).send(posts);
  } catch (error) {
    return res.status(500).send({
      error: "Une erreur est survenu lors de la récupération des posts ",
    });
  }
};

/* requete pour afficher les posts les plus likés*/
exports.getHotPosts = async (req, res) => {
  try {
    const posts = await db.Post.findAll({
      attributes: [
        "id",
        "message",
        "imageUrl",
        "link",
        "createdAt",
        [
          db.sequelize.literal(
            "(SELECT COUNT(*) FROM Likes WHERE Likes.PostId = Post.id)"
          ),
          "LikeCount",
        ],
      ],
      order: [[db.sequelize.literal("LikeCount"), "DESC"]],

      include: [
        {
          model: db.User,
          attributes: ["pseudo", "id", "photo"],
        },
        {
          model: db.Like,
          attributes: ["PostId", "UserId"],
        },
        {
          model: db.Comment,
          order: [["createdAt", "DESC"]],
          attributes: ["message", "pseudo", "UserId", "id"],
          include: [
            {
              model: db.User,
              attributes: ["photo", "pseudo"],
            },
          ],
        },
      ],
    });
    res.status(200).send(posts);
  } catch (error) {
    return res.status(500).send({
      error: "Une erreur est survenu lors de la récupération des posts ",
    });
  }
};

/* requete pour afficher un post en particulier */
exports.getOnePost = async (req, res) => {
  try {
    const post = await db.Post.findOne({
      /* on le recupére avec l'id en ajoutant les tables et attributs nécessaires*/
      where: { id: req.params.id },
      include: [
        {
          model: db.User,
          attributes: ["pseudo", "photo", "id"],
        },
        {
          model: db.Like,
          attributes: ["PostId", "UserId"],
        },
        {
          model: db.Comment,
          order: [["createDate", "DESC"]],
          attributes: ["message", "pseudo", "UserId"],
          include: [
            {
              model: db.User,
              attributes: ["photo", "pseudo"],
            },
          ],
        },
      ],
    });
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

/*creation d'un post */
exports.createPost = async (req, res) => {
  const userId = token.getUserId(req);
  let imageUrl;
  try {
    const user = await db.User.findOne({
      attributes: ["pseudo", "id", "photo"],
      where: { id: userId },
    });
    if (user !== null) {
      if (req.file) {
        imageUrl = `${req.protocol}://${req.get("host")}/upload/${
          req.file.filename
        }`;
      } else {
        imageUrl = null;
      }
      const post = await db.Post.create({
        include: [
          {
            model: db.User,
            attributes: ["pseudo", "photo", "id"],
          },
        ],
        message: req.body.message,
        link: req.body.link,
        imageUrl: imageUrl,
        UserId: user.id,
      });
      res
        .status(201)
        .json({ post: post, messageRetour: "Votre post est ajouté" });
    } else {
      res.status(400).send({ error: "Erreur " });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

/* suppression d'un post */
exports.deletePost = async (req, res) => {
  try {
    const userId = token.getUserId(req);
    const checkAdmin = await db.User.findOne({ where: { id: userId } });
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (userId === post.UserId || checkAdmin.admin === true) {
      if (post.imageUrl) {
        const filename = post.imageUrl.split("/upload")[1];
        fs.unlink(`upload/${filename}`, () => {
          db.Post.destroy({ where: { id: post.id } });
          res.status(200).json({ message: "Post supprimé" });
        });
      } else {
        db.Post.destroy({ where: { id: post.id } }, { truncate: true });
        res.status(200).json({ message: "Post supprimé" });
      }
    } else {
      res.status(400).json({ message: "Vous n'avez pas les droits requis" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

/* modification d'un post */
exports.updatePost = async (req, res) => {
  try {
    let newImageUrl;
    const userId = token.getUserId(req);
    let post = await db.Post.findOne({ where: { id: req.params.id } });
    if (userId === post.UserId) {
      if (req.file) {
        newImageUrl = `${req.protocol}://${req.get("host")}/upload/${
          req.file.filename
        }`;
        if (post.imageUrl) {
          const filename = post.imageUrl.split("/upload")[1];
          fs.unlink(`upload/${filename}`, (err) => {
            if (err) console.log(err);
            else {
              console.log(`Deleted file: upload/${filename}`);
            }
          });
        }
      }
      if (req.body.message) {
        post.message = req.body.message;
      }
      post.link = req.body.link;
      post.imageUrl = newImageUrl;
      const newPost = await post.save({
        fields: ["message", "link", "imageUrl"],
      });
      res.status(200).json({ newPost: newPost, messageRetour: "post modifié" });
    } else {
      res.status(400).json({ message: "Vous n'avez pas les droits requis" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

/*permet de liker un post */
exports.likePost = async (req, res, next) => {
  try {
    const userId = token.getUserId(req);
    const postId = req.params.id;
    const user = await db.Like.findOne({
      where: { UserId: userId, PostId: postId },
    });
    if (user) {
      await db.Like.destroy(
        { where: { UserId: userId, PostId: postId } },
        { truncate: true, restartIdentity: true }
      );
      res.status(200).send({ messageRetour: "Vous n'aimez plus ce post" });
    } else {
      await db.Like.create({
        UserId: userId,
        PostId: postId,
      });
      res.status(201).json({ messageRetour: "Vous aimez ce post" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

/* ajouter un commentaire a un post */
exports.addComment = async (req, res) => {
  try {
    const comment = req.body.commentMessage;
    const pseudo = req.body.commentPseudo;
    const newComment = await db.Comment.create({
      message: comment,
      pseudo: pseudo,
      UserId: token.getUserId(req),
      PostId: req.params.id,
    });
    res
      .status(201)
      .json({ newComment, messageRetour: "Votre commentaire est publié" });
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

/* supprimer le commentaire d 'un post */
exports.deleteComment = async (req, res) => {
  try {
    const userId = token.getUserId(req);
    const checkAdmin = await db.User.findOne({ where: { id: userId } });
    const comment = await db.Comment.findOne({ where: { id: req.params.id } });

    if (userId === comment.UserId || checkAdmin.admin === true) {
      db.Comment.destroy({ where: { id: req.params.id } }, { truncate: true });
      res.status(200).json({ message: "commentaire supprimé" });
    } else {
      res.status(400).json({ message: "Vous n'avez pas les droits requis" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};
