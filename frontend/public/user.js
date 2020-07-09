
import ConstantsClass from './constants.js';
(async () => {
    const { serverBaseUrl, appBaseUrl } = ConstantsClass();
    let users = [];
    
    const init = async () => {
        const users = await fetchUser();
        createUserBox(users);
    };

    const fetchUser = async () => {
        const response = await fetch(`${serverBaseUrl}api/users`);
        const resp = await response.json();
        users = resp;
        return users;
    };

    const submitAddListner = () => {
        document.getElementById('submit').addEventListener('click', (event) => {
            const firstName = document.getElementById('fname').value;
            const lastName = document.getElementById('lname').value;
            save({ firstName, lastName });
        });
    };
    submitAddListner();

    const save = async (data) => {
        const response = await fetch(`${serverBaseUrl}api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const user = await response.json();
        document.getElementById('box-wrapper').innerHTML = '';
        users = [];
        init();
    }

    const deleteUserService = async (id) => {
        const response = await fetch(`${serverBaseUrl}api/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const user = await response.json();
        document.getElementById('box-wrapper').innerHTML = '';
        users = [];
        init();
    }






    const bindEvents = () => {
        const elements = document.getElementsByClassName('fa-edit');
        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', (event) => {
                editUser(event.currentTarget.id);
            });
        }
        const trashElements = document.getElementsByClassName('fa-trash');
        for (var i = 0; i < elements.length; i++) {
            trashElements[i].addEventListener('click', (event) => {
                deleteUser(event.currentTarget.id);
            });
        }
    }

    const editUser = (id) => {
        console.log(users);
        const user = users.filter((u) => u._id === id);
        document.getElementById('fname').value = user[0].firstName;
        document.getElementById('lname').value = user[0].lastName;
    }

    const deleteUser = (id) => {
        console.log(users);
        const user = users.filter((u) => u._id === id);
        deleteUserService(id);
    }



    const createUserBox = (users) => {
        const boxWrapper = document.getElementById('box-wrapper');
        users.forEach((res) => {
            const ele = ` 
        <div class='col-sm-5  user-box'>
            <div>
                <div><img src='${appBaseUrl}/images/default-user.jpg'></div>
                <div class='name'>${res.firstName} ${res.lastName}</div> 
                <i  id='${res._id}' class=" fa fa-edit fa-2x" ></i>
                <i id='${res._id}' class="fa fa-trash fa-2x" ></i>
                
            </div>              
        </div>`;
            boxWrapper.innerHTML += ele;
        });
        bindEvents();

    };
    init();
})();


