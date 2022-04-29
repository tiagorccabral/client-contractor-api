const httpStatus = require('http-status');

const getProfile = () => {
  return [
    async (req, res, next) => {
      const { Profile } = req.app.get('models');
      const profile = await Profile.findOne({ where: { id: req.get('profile_id') || 0 } });
      if (!profile) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'Non authenticated user' }).end();
      req.profile = profile;
      next();
    },
  ];
};
module.exports = { getProfile };
