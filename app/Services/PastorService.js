'use strict'
const Pastor = use('App/Models/Pastor')


class PastorService {
	async fetchPastors() {
		const { data: pastors } = await Pastor.query().fetch()
    return {
			status: 'success',
			statusCode: 200,
			message: 'Successfully fetched pastors',
			data: pastors
		}
	}
	async getPastor(id) {
		const pastor = await Pastor.query().where({ id: id }).first()
		return pastor
	}

	async createPastor(data) {
		const pastorData = {
			first_name: data.first_name,
			last_name: data.last_name
		}
		return await Pastor.create(pastorData)
	}
}

module.exports = PastorService