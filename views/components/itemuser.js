export const createUser = (user, userId) => {
  let sell = [0]
  async function loadItemCars() {
    try {
      const response = await axios.put('/api/admin/itemcars', { userId });
      console.log('response da', response.data);
      sell.push(response.data)
    } catch (error) {
      console.error('Error al obtener itemCount', error);
      return 0;
    }
  }

  loadItemCars();

  console.log('sell me dio', sell);
    return `<tr>
    <th scope="row">
      <div class="media align-items-center">
        <a href="#" class="avatar rounded-circle mr-3">
          <img alt="Image placeholder" src="../assets/img/theme/bootstrap.jpg">
        </a>
        <div class="media-body">
          <span class="mb-0 text-sm">${user.name}</span>
        </div>
      </div>
    </th>
    <td>
    ${user.email}
    </td>
    <td>
      <span class="badge badge-dot mr-4">
        <i class="bg-warning"></i> pending
      </span>
    </td>
    <td>
      <div class="avatar-group">
        ${sell}
      </div>
    </td>
  
  </tr>`
}