import { http, HttpResponse } from 'msw';
import { User, UserStats } from '../types';

// Sample user data
const users: User[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496'
      }
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets'
    }
  },
  // Add more users as needed...
];

// Generate a deterministic random value based on seed
const getRandomValue = (min: number, max: number, seed: number): number => {
  const x = Math.sin(seed) * 10000;
  const rand = x - Math.floor(x);
  return Math.floor(rand * (max - min + 1) + min);
};

// Mock API handlers
export const handlers = [
  // GET /users - Fetches all users with optional pagination
  http.get('https://jsonplaceholder.typicode.com/users', ({ request }) => {
    const url = new URL(request.url);
    // Handle pagination
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    // Handle search
    const search = url.searchParams.get('search')?.toLowerCase();
    let filteredUsers = [...users];
    
    if (search) {
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(search) || 
        user.email.toLowerCase().includes(search) ||
        user.username.toLowerCase().includes(search)
      );
    }
    
    // Handle company filter
    const companyFilter = url.searchParams.get('company')?.toLowerCase();
    if (companyFilter) {
      filteredUsers = filteredUsers.filter(user => 
        user.company.name.toLowerCase().includes(companyFilter)
      );
    }
    
    // Handle city filter
    const cityFilter = url.searchParams.get('city')?.toLowerCase();
    if (cityFilter) {
      filteredUsers = filteredUsers.filter(user => 
        user.address.city.toLowerCase().includes(cityFilter)
      );
    }
    
    // Handle sorting
    const sortBy = url.searchParams.get('sortBy');
    const sortOrder = url.searchParams.get('sortOrder') || 'asc';
    
    if (sortBy && sortBy in users[0]) {
      filteredUsers.sort((a: any, b: any) => {
        const aValue = a[sortBy as keyof User];
        const bValue = b[sortBy as keyof User];
        
        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }
    
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    
    return HttpResponse.json(paginatedUsers);
  }),

  // GET /users/:id - Fetches a specific user
  http.get('https://jsonplaceholder.typicode.com/users/:id', ({ params }) => {
    const id = params.id;
    const user = users.find(u => u.id === Number(id));
    
    if (!user) {
      return new HttpResponse(
        JSON.stringify({ message: 'User not found' }),
        { status: 404 }
      );
    }
    
    return HttpResponse.json(user);
  }),

  // GET /posts - Fetches posts with optional userId filter
  http.get('https://jsonplaceholder.typicode.com/posts', ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    
    // Generate some fake posts for this user
    const posts = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      userId: Number(userId),
      title: `Post ${i + 1} for user ${userId}`,
      body: `This is the body of post ${i + 1} for user ${userId}. It contains some sample text.`
    }));
    
    return HttpResponse.json(posts);
  }),

  // GET /todos - Fetches todos with optional userId filter
  http.get('https://jsonplaceholder.typicode.com/todos', ({ request }) => {
    const url = new URL(request.url);
    const userId = Number(url.searchParams.get('userId'));
    
    // Generate some fake todos for this user
    const todos = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      userId,
      title: `Todo ${i + 1} for user ${userId}`,
      completed: i % 3 === 0 // Alternating completed status
    }));
    
    return HttpResponse.json(todos);
  })
];