/**
 * ShopController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

	filterAction: async (req, res) => {
		let paramIds = JSON.parse(req.param('ids'));
		if(paramIds) {
			let result = await MilkType.find({id: paramIds}).populate('shops');
			let ids = [];
			for(let item of result) {
				for(let shop of item.shops) {
					ids.push(shop.id);
				}
			}
			ids = [...new Set(ids)];
			let out = await Shop.find({id:ids}).populate('milks');
			return res.send(out);
		} else {
			res.send({});
		}
	}
};

