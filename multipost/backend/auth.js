const bcrypt = require('bcrypt');
const path = require('node:path');
const fs = require('node:fs');

const USERS_FILE = path.resolve(__dirname, 'storage', 'users.json');

// Inicializa arquivo de usuários se não existir
function initUsersFile() {
  if (!fs.existsSync(USERS_FILE)) {
    const defaultPassword = process.env.DEFAULT_PASSWORD || 'admin123';
    const hashedPassword = bcrypt.hashSync(defaultPassword, 10);
    
    const defaultUsers = {
      users: [
        {
          id: '1',
          username: 'admin',
          password: hashedPassword,
          createdAt: new Date().toISOString(),
        },
      ],
    };
    
    const storageDir = path.dirname(USERS_FILE);
    if (!fs.existsSync(storageDir)) {
      fs.mkdirSync(storageDir, { recursive: true });
    }
    
    fs.writeFileSync(USERS_FILE, JSON.stringify(defaultUsers, null, 2));
    console.log('[Auth] Arquivo de usuários criado. Usuário padrão: admin /', defaultPassword);
  }
}

// Carrega usuários do arquivo
function loadUsers() {
  initUsersFile();
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('[Auth] Erro ao carregar usuários:', error);
    return { users: [] };
  }
}

// Salva usuários no arquivo
function saveUsers(usersData) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(usersData, null, 2));
    return true;
  } catch (error) {
    console.error('[Auth] Erro ao salvar usuários:', error);
    return false;
  }
}

// Verifica credenciais
async function verifyCredentials(username, password) {
  const usersData = loadUsers();
  const user = usersData.users.find((u) => u.username === username);
  
  if (!user) {
    return null;
  }
  
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return null;
  }
  
  // Retorna dados do usuário sem a senha
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

// Middleware para verificar autenticação
function requireAuth(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).json({ error: 'Não autenticado. Faça login primeiro.' });
}

module.exports = {
  verifyCredentials,
  requireAuth,
  loadUsers,
  saveUsers,
  initUsersFile,
};

