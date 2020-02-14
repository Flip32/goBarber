import { startOfDay, endOfDay, parseISO } from 'date-fns'
import { Op } from 'sequelize'

import Appointment from "../models/Appointment";
import User from "../models/User";

class ScheduleController {
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true}
    })

    if(!checkUserProvider){
      return res.status(401).json({ error: 'User is not a provider'})
    }

    const { date } = req.query
    const parseDate = parseISO(date)

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [ startOfDay(parseDate), endOfDay(parseDate) ]
        }
      },
      order: ['date'],
      attributes: ['id', 'date', 'createdAt', 'updatedAt'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name']
        }
      ]
    })

    return res.json(appointments)
  }
}

export default new ScheduleController()

//*
// Puxar todas as agendas através de um usuário não provider
/*const agenda = await Appointment.findAll({
  where: { canceled_at: null},
  order:['date'],
  attributes: ['id', 'date'],
  include: [
    {
      model: User,
      as: 'provider',
      attributes: ['id', 'name']
    },
    {
      model: User,
      as: 'user',
      attributes: ['id', 'name']
    },
  ]
})*/
// */
