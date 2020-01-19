const axios = require('axios');
const Dev = require('../models/Dev');
const parseString = require('../utils/parseStringArray');

module.exports = {
    async index (request,response){
        const devs = await Dev.find();
        return response.json(devs);
    },
    async store (request, response)  {
        const { github_username, techs ,latitude,longitude}= request.body;
    
        const dev = await Dev.findOne({github_username});
        if(dev){
            return response.json(dev);
        }
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        const {name = login ,avatar_url, bio} = apiResponse.data;
    
        const techsArray = parseString(techs);
        const location = {
            type: 'Point',
            coordinates: [longitude,latitude],
        }
    
        const devCreate = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location,
        });
    
    
    
        return response.json(devCreate);
    }
}