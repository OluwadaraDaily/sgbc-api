'use strict'
const LagosBibleConference2022 = use('App/Models/LagosBibleConference2022')
const Utils = use('App/Services/util/Utils')

class LagosBibleConferenceService {
	constructor() {
		this.lbc2022 = LagosBibleConference2022
}
	async storePersonnelInfo(data) {
    const personnelData = await this.lbc2022.create(data)
    return {
      status: 'success',
      statusCode: 201,
      message: 'Successfully stored personnel information',
      data: personnelData
    }
  }
}

module.exports = LagosBibleConferenceService