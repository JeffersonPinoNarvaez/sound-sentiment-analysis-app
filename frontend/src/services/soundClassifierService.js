import api from './api';

const getAll = async () => {
    return await api.get('/core/especialidades', null);
};

const get = async (specialityId) => {
    return await api.get('/core/especialidades/' + specialityId, null);
};

const update = async (speciality) => {
    return await api.put('/core/especialidades/' + speciality.id , speciality);
};

const create = async (speciality) => {
    return await api.post('/core/especialidades/', speciality);
};

const remove = async (specialityId) => {
    return await api.delete('/core/especialidades/' + specialityId, null);
};

const specialtiesServices = {
    getAll,
    get,
    update,
    create,
    remove
};

export default specialtiesServices;