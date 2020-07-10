
import ConstantsClass from './constants.js';
import ClientService from './client-service.js';
import DomService from './dom-service.js'
(async () => {
    const { serverBaseUrl, appBaseUrl } = ConstantsClass();
    const clientService = new ClientService();
    const domService = new DomService();
    let users = [];

    const init = async () => {
        await getAllUsers();
        addNewUserListner();
        addSearchListner();
    };

    const getAllUsers = async () => {
        users = await getAllUserService();
        createUserBoxWrapper();
    };

    const addNewUserListner = () => {
        document.getElementById('submit').addEventListener('click', (event) => {
            addNewUser();
        });
    };

    const addSearchListner = () => {
        document.getElementById('search').addEventListener('keyup', async (event) => {
            users = await getfilteredUser({ filterValue: event.currentTarget.value });
            document.getElementById('box-wrapper').innerHTML = '';
            createUserBoxWrapper();
        });
    };

    const addNewUser = async () => {
        const firstName = document.getElementById('fname').value;
        const lastName = document.getElementById('lname').value;
        try {
            const resp = await addNewUserService({ firstName, lastName });
            if (resp) {
                users.push(resp);
                domService.createUserBoxElement(appBaseUrl, resp);
                bindEvents();
                document.getElementById('fname').value = '';
                document.getElementById('lname').value = '';
            }
        } catch (error) {
            console.log(error);
        }
    }

    const bindEvents = () => {
        bindEventForEdit();
        bindEventForDelete();
    }

    const bindEventForDelete = () => {
        const elements = document.getElementsByClassName('fa-trash');
        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', (event) => {
                deleteUser(event.currentTarget);
            });
        }
    }

    const bindEventForEdit = () => {
        const elements = document.getElementsByClassName('fa-edit');
        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', (event) => {
                createEditUserElements(event.currentTarget, 'save');
            });
        }
    }

    const bindEventsForSave = () => {
        const elements = document.getElementsByClassName('fa-save');
        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', (event) => {
                editUser(event.currentTarget);
            });
        }
    }


    const getSelctedUserDetails = (currentTarget) => {
        const id = currentTarget.id;
        return users.filter((u) => u._id === id)[0];
    }

    const editUser = async (currentTarget) => {
        const id = currentTarget.id;
        const fname = currentTarget.parentElement.getElementsByClassName('edit_fname')[0].value;
        const lname = currentTarget.parentElement.getElementsByClassName('edit_lname')[0].value;
        try {
            const resp = await editUserServiceCall(id,
                { firstName: fname, lastName: lname });
            if (resp) {
                users.map((user) => {
                    if (user._id === id) {
                        user.firstName = fname;
                        user.lastName = lname;
                    }
                });
                createEditUserElements(currentTarget, 'edit');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteUser = async (currentTarget) => {
        const id = currentTarget.id;
        const user = users.filter((u) => u._id === id)[0];
        try {
            const resp = await deleteUserService(id);
            if (resp) {
                users.splice(users.indexOf(user), 1);
                currentTarget.parentElement.parentElement.remove();
            }
        } catch (error) {
            console.log('error');
        }
    }

    const createUserBoxWrapper = () => {
        users.forEach((user) => {
            domService.createUserBoxElement(appBaseUrl, user);
        });
        bindEvents();
    };

    const createEditUserElements = (currentTarget, type) => {
        const { firstName, lastName, _id } = getSelctedUserDetails(currentTarget);
        const parentDiv = currentTarget.parentElement.parentElement;
        if (parentDiv) {
            if (type === 'save') {
                domService.createSaveElements({ appBaseUrl, parentDiv, _id, firstName, lastName });
                bindEventsForSave();
            } else {
                domService.createEditElements({ appBaseUrl, parentDiv, _id, firstName, lastName });
                bindEvents();
            }
        }
    }

    const getfilteredUser = async (data) => {
        return await clientService.post(`${serverBaseUrl}api/users/filterByName`, data);
    }

    const getAllUserService = async () => {
        return await clientService.get(`${serverBaseUrl}api/users`);
    }

    const addNewUserService = async (data) => {
        return await clientService.post(`${serverBaseUrl}api/users`, data);
    }

    const deleteUserService = async (id) => {
        return await clientService.delete(`${serverBaseUrl}api/users/${id}`);
    }

    const editUserServiceCall = async (id, data) => {
        return await clientService.put(`${serverBaseUrl}api/users/${id}`, data);
    }

    init();
})();


