const multer = require('multer');
const path = require('path');

const assetStore = multer.diskStorage({
  destination(req, mediaAsset, cb) {
    cb(null, 'uploads/');
  },
  filename(req, mediaAsset, cb) {
    cb(null, `${mediaAsset.fieldname}-${Date.now()}${path.extname(mediaAsset.originalname)}`);
  }
});

function validateAssetSignature(mediaAsset, cb) {
  const authorizedSignatures = /jpg|jpeg|png|webp/;
  const hasValidExtension = authorizedSignatures.test(path.extname(mediaAsset.originalname).toLowerCase());
  const hasValidMime = authorizedSignatures.test(mediaAsset.mimetype);

  if (hasValidExtension && hasValidMime) {
    return cb(null, true);
  } else {
    cb('Asset format unauthorized (jpg, jpeg, png, webp)');
  }
}

exports.upload = multer({
  storage: assetStore,
  limits: { fileSize: 5000000 },
  fileFilter: function (req, mediaAsset, cb) {
    validateAssetSignature(mediaAsset, cb);
  }
});

exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No media asset received' });
  }

  res.status(200).json({
    success: true,
    data: `/uploads/${req.file.filename}`
  });
};
