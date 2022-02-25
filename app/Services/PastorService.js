'use strict'
const Pastor = use('App/Models/Pastor')


class PastorService {
	async fetchPastors() {
		const pastors = await Pastor.all()
    return pastors.toJSON()
	}
}

module.exports = PastorService