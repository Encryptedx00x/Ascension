// Arquivo de substituição do Prisma Client
import { mockData } from '../api/mock/data';

// Simulação do comportamento do Prisma Client
export const prisma = {
  budget: {
    findMany: async () => {
      return mockData.budgets;
    },
    findUnique: async ({ where }) => {
      return mockData.budgets.find(budget => budget.id === where.id);
    },
    create: async ({ data }) => {
      const newBudget = {
        id: `${mockData.budgets.length + 1}`,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      mockData.budgets.push(newBudget);
      return newBudget;
    },
    update: async ({ where, data }) => {
      const index = mockData.budgets.findIndex(budget => budget.id === where.id);
      if (index === -1) throw new Error('Budget not found');
      
      const updatedBudget = {
        ...mockData.budgets[index],
        ...data,
        updatedAt: new Date().toISOString()
      };
      
      mockData.budgets[index] = updatedBudget;
      return updatedBudget;
    },
    delete: async ({ where }) => {
      const index = mockData.budgets.findIndex(budget => budget.id === where.id);
      if (index === -1) throw new Error('Budget not found');
      
      const deleted = mockData.budgets[index];
      mockData.budgets.splice(index, 1);
      return deleted;
    }
  },
  
  contact: {
    findMany: async () => {
      return mockData.contacts;
    },
    findUnique: async ({ where }) => {
      return mockData.contacts.find(contact => contact.id === where.id);
    },
    create: async ({ data }) => {
      const newContact = {
        id: mockData.contacts.length + 1,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      mockData.contacts.push(newContact);
      return newContact;
    },
    update: async ({ where, data }) => {
      const index = mockData.contacts.findIndex(contact => contact.id === where.id);
      if (index === -1) throw new Error('Contact not found');
      
      const updatedContact = {
        ...mockData.contacts[index],
        ...data,
        updatedAt: new Date().toISOString()
      };
      
      mockData.contacts[index] = updatedContact;
      return updatedContact;
    },
    delete: async ({ where }) => {
      const index = mockData.contacts.findIndex(contact => contact.id === where.id);
      if (index === -1) throw new Error('Contact not found');
      
      const deleted = mockData.contacts[index];
      mockData.contacts.splice(index, 1);
      return deleted;
    }
  },
  
  portfolio: {
    findMany: async () => {
      return mockData.portfolio;
    },
    findUnique: async ({ where }) => {
      return mockData.portfolio.find(item => item.id === where.id);
    },
    create: async ({ data }) => {
      const newItem = {
        id: `${mockData.portfolio.length + 1}`,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      mockData.portfolio.push(newItem);
      return newItem;
    },
    update: async ({ where, data }) => {
      const index = mockData.portfolio.findIndex(item => item.id === where.id);
      if (index === -1) throw new Error('Portfolio item not found');
      
      const updatedItem = {
        ...mockData.portfolio[index],
        ...data,
        updatedAt: new Date().toISOString()
      };
      
      mockData.portfolio[index] = updatedItem;
      return updatedItem;
    },
    delete: async ({ where }) => {
      const index = mockData.portfolio.findIndex(item => item.id === where.id);
      if (index === -1) throw new Error('Portfolio item not found');
      
      const deleted = mockData.portfolio[index];
      mockData.portfolio.splice(index, 1);
      return deleted;
    }
  },
  
  teamMember: {
    findMany: async () => {
      return mockData.team;
    },
    findUnique: async ({ where }) => {
      return mockData.team.find(member => member.id === where.id);
    },
    create: async ({ data }) => {
      const newMember = {
        id: mockData.team.length + 1,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      mockData.team.push(newMember);
      return newMember;
    },
    update: async ({ where, data }) => {
      const index = mockData.team.findIndex(member => member.id === where.id);
      if (index === -1) throw new Error('Team member not found');
      
      const updatedMember = {
        ...mockData.team[index],
        ...data,
        updatedAt: new Date().toISOString()
      };
      
      mockData.team[index] = updatedMember;
      return updatedMember;
    },
    delete: async ({ where }) => {
      const index = mockData.team.findIndex(member => member.id === where.id);
      if (index === -1) throw new Error('Team member not found');
      
      const deleted = mockData.team[index];
      mockData.team.splice(index, 1);
      return deleted;
    }
  },
  
  newsletter: {
    findMany: async () => {
      return mockData.newsletter;
    },
    create: async ({ data }) => {
      const newSubscription = {
        id: mockData.newsletter.length + 1,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      mockData.newsletter.push(newSubscription);
      return newSubscription;
    }
  },
  
  serviceRequest: {
    findMany: async () => {
      return mockData.serviceRequests;
    },
    findUnique: async ({ where }) => {
      return mockData.serviceRequests.find(request => request.id === where.id);
    },
    create: async ({ data }) => {
      const newRequest = {
        id: `${mockData.serviceRequests.length + 1}`,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      mockData.serviceRequests.push(newRequest);
      return newRequest;
    },
    update: async ({ where, data }) => {
      const index = mockData.serviceRequests.findIndex(request => request.id === where.id);
      if (index === -1) throw new Error('Service request not found');
      
      const updatedRequest = {
        ...mockData.serviceRequests[index],
        ...data,
        updatedAt: new Date().toISOString()
      };
      
      mockData.serviceRequests[index] = updatedRequest;
      return updatedRequest;
    }
  },
  
  admin: {
    findUnique: async ({ where }) => {
      // Simulando um admin para autenticação
      if (where.username === 'admin') {
        return {
          id: '1',
          username: 'admin',
          // Esta é uma senha fake apenas para mock (não use em produção)
          password: '$2b$10$6HmF6d8QHWGe4O0bGoI6/.KOI.hI.a9VbJsBlXC8QoM8x81QHapIG', // "admin123"
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
      }
      return null;
    }
  }
}; 