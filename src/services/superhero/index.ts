import { apiService } from "..";

interface Params {
    _start: number;
    _end: number
}
const getSuperhero = ({_start,_end}: Params) => apiService.get(`/superheros?_start=${_start}&_end=${_end}`).then((response) => {
    return response.data;
});

export {getSuperhero};