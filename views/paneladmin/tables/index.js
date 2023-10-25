import { createUser } from '../../components/itemuser.js';

const usersProfileContent = document.getElementById('user-content')

async function completeUsers() {
    const users = await axios.put('/api/admin/users');
    const theUsers = users.data
    console.log('frontend dio', users.data);
    
    theUsers.forEach(user => {
      const userId = user.id;
      const userProfileItem = document.createElement('tr');
      userProfileItem.id = user.id;
      userProfileItem.innerHTML = createUser(user, userId)
      usersProfileContent.appendChild(userProfileItem);
    });
}

completeUsers()