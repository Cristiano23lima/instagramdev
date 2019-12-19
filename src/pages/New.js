import React, {Component} from 'react';//para poder usar as classes para a criação de componentes

import api from '../services/api';

import './New.css';


class New extends Component{
    
    state = {
        image: null,
        author: '',
        description: '',
        place: '',
        hashtags: '',
        
    }

    handleSubmit = async e =>{
        e.preventDefault();


        const data = new FormData();

        data.append('image', this.state.image);
        data.append('author', this.state.author);
        data.append('place', this.state.place);
        data.append('description', this.state.description);
        data.append('hashtags', this.state.hashtags);

        await api.post('posts', data);

        this.props.history.push("/");//manda o usuario para a rota inicial
    }

    handleImageChange = e =>{
        this.setState({ image: e.target.files[0] });//pega a imagem
    }

    handleChange = e =>{//formato para poder utilizar o this no react  //ele recebe um evento e vai armazenar todos os valores nas variaveis quando usuario fica digitando
        this.setState({ [ e.target.name]: e.target.value  })//vai pegar o nome do input onde foi chamado a função e ir armazenando seu valor na variavel
    }
     
    render(){//função obrigatoria para esse tipo de formato (usando classes)
        return (
            <form id="new-post" onSubmit={this.handleSubmit}>
                <input type="file" onChange={this.handleImageChange}/>

                <input
                 type="text" 
                 name="author"
                 placeholder="Autor do post"
                 onChange={this.handleChange}
                 value = {this.state.author}
                 />

                <input
                 type="text" 
                 name="place"
                 placeholder="Local do post"
                 onChange={this.handleChange}
                 value = {this.state.place}
                 />
                 
                 <input
                 type="text" 
                 name="description"
                 placeholder="Descrição do post"
                 onChange={this.handleChange}
                 value = {this.state.description}
                 />
                 
                 <input
                 type="text" 
                 name="hashtags"
                 placeholder="Hashtags do post"
                 onChange={this.handleChange}
                 value = {this.state.hashtags}
                 />

                 <button type="submit">Enviar</button>
            </form>
        );
    }
}

export default New;//exporta minha classe Feed

