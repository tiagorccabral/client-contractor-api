const httpStatus = require('http-status');

const getAdmin = () => {
    return [
        async (req, res, next) => {
            const { Profile } = req.app.get('models')
            const profile = await Profile.findOne({ where: { id: req.get('profile_id') || 0 } })
            if (!profile) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'Non authenticated user' }).end()
            // just using profile id == 1 as admin as a temp data
            if (profile.id !== 1) {
                return res.status(httpStatus.UNAUTHORIZED).send({ error: 'Non authorized user' }).end()
            }
            req.profile = profile
            next()
        }
    ]
}
module.exports = { getAdmin }