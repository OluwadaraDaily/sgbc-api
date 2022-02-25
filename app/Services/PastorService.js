'use strict'
const Pastor = use('App/Models/Pastor')


class PastorService {
	async fetchPastors() {
		const pastors = await Pastor.all()
    return pastors.toJSON()
	}
	async getPastor(id) {
		const pastor = await Pastor.query().where({ id: id }).first()
		return pastor
	}
}

module.exports = PastorService