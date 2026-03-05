const UserSummary = require("../models/Summary");

const GetSummary =  async (req, res) => {
    try {
        const userSummary = await UserSummary.findOne({ UserId: req.user.id });
        if (!userSummary) {
            return res.status(404).json({ message: 'Summary not found for the user' });
        }
        return res.json({ summary: userSummary });
    } catch (error) {
        console.error('Error fetching summary:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    GetSummary
}