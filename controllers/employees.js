const { prisma } = require('../prisma/prisma-client');

/**
 * @route GET /api/emplyees
 * @desc Получение всех сотрудников
 * @access Private
 */
const all = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json(employees);
  } catch (err) {
    res.status(400).json({ message: 'He удалось получить сотрудников'});
  }
}

/**
 * @route GET /api/emplyees/:id
 * @desc Получение сотрудника
 * @access Private
 */
const one = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await prisma.employee.findFirst({
      where: {
        id
      }
    })
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: 'He удалось найти сотрудника'});
  }
}

/**
 * @route POST /api/emplyees
 * @desc Добавление сотрудника
 * @access Private
 */
const add = async (req, res) => {
  try {
    const data = req.body;
    if (!data.firstName || !data.lastName || !data.address || !data.age) {
      return res.status(400).json({ message: 'Bce поля обязательны'})
    }

    const employee = await prisma.employee.create({
      data: {
        ...data,
        userId: req.user.id
      },
    });

    return res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ message: 'He удалось добавить сотрудника'});
  }
}

/**
 * @route DELETE /api/emplyees/:id
 * @desc Удаление сотрудника
 * @access Private
 */
const del = async (req, res) => {
  const { id } = req.params
  try {
    await prisma.employee.delete({
      where: {
        id
      }
    })
    res.status(204);
  } catch (err) {
    res.status(500).json({ message: 'He удалось удалить сотрудника'});
  }
}

/**
 * @route UPDATE /api/emplyees/:id
 * @desc Редактирование сотрудника
 * @access Private
 */
const edit = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  try {
    await prisma.employee.update({
      where: {
        id
      },
      data: {
        ...data,
        id
      }
    })
    res.status(204);
  } catch (err) {
    res.status(500).json({ message: 'He удалось обновить сотрудника'});
  }
}

module.exports = {
  all,
  one,
  add,
  del,
  edit
}