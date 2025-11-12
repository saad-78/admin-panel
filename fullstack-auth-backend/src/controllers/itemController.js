const prisma = require('../config/database');

// Get all items for current user (with pagination & search)
const getItems = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status } = req.query;
    const userId = req.user.id;

    const skip = (page - 1) * limit;
    
    // Build where clause
    const where = {
      userId: req.user.role === 'ADMIN' ? undefined : userId,
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(status && { status }),
    };

    const [items, total] = await Promise.all([
      prisma.item.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { name: true, email: true },
          },
        },
      }),
      prisma.item.count({ where }),
    ]);

    res.json({
      items,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get items error:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};

// Get single item
const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await prisma.item.findUnique({
      where: { id },
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    });

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Check ownership (users can only see their own items, admins can see all)
    if (req.user.role !== 'ADMIN' && item.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ item });
  } catch (error) {
    console.error('Get item error:', error);
    res.status(500).json({ error: 'Failed to fetch item' });
  }
};

// Create item
const createItem = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const item = await prisma.item.create({
      data: {
        title,
        description,
        status: status || 'ACTIVE',
        userId: req.user.id,
      },
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    });

    res.status(201).json({ message: 'Item created', item });
  } catch (error) {
    console.error('Create item error:', error);
    res.status(500).json({ error: 'Failed to create item' });
  }
};

// Update item
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    // Check if item exists and user has permission
    const existingItem = await prisma.item.findUnique({
      where: { id },
    });

    if (!existingItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    if (req.user.role !== 'ADMIN' && existingItem.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const item = await prisma.item.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(status && { status }),
      },
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    });

    res.json({ message: 'Item updated', item });
  } catch (error) {
    console.error('Update item error:', error);
    res.status(500).json({ error: 'Failed to update item' });
  }
};

// Delete item
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if item exists and user has permission
    const existingItem = await prisma.item.findUnique({
      where: { id },
    });

    if (!existingItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    if (req.user.role !== 'ADMIN' && existingItem.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await prisma.item.delete({
      where: { id },
    });

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Delete item error:', error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
};

// Admin: Get all users with item count
const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        _count: {
          select: { items: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  getAllUsers,
};
