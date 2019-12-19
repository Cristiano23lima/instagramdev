import React, {Component} from 'react';//para poder usar as classes para a criação de componentes
import './Feed.css';
import api from '../services/api';
import io from 'socket.io-client';

//minhas imagens
import more from '../assets/more.svg'; 
import comment from '../assets/comment.svg'; 
import like from '../assets/like.svg'; 
import send from '../assets/send.svg'; 

class Feed extends Component{
    state = {//para poder fazer as atualizações realizadas no feed
        feed: [],
    }
    
    async componentDidMount(){//é como se fosse o construct, assim que a classe é carregada essa função é disparada
        this.registerToSocket();
        
        const response = await api.get('posts');//aqui está chamando http://localhost:3334 que eu difini no arquivo api mais o arquivo que eu quero que é os posts; e irá retornar uma variavel data com todas as informações do feed
        this.setState({feed: response.data});
    }

    registerToSocket = () => {
        const socket = io('https://backendinstagramdev.herokuapp.com/');

        //post, like
        socket.on('post', newPost => {
            this.setState({ feed: [newPost, ...this.state.feed] });//adiciona o novo post no começo do array
        });

        socket.on('like', likedPost => {
            this.setState({
                feed: this.state.feed.map(post=>
                    post._id === likedPost._id ? likedPost : post //pega o id do post curtido e atualiza esse post
                )
            })
        })
    }

    handleLike = id => {
        api.post(`/posts/${id}/like`);
    }

    render(){//função obrigatoria para esse tipo de formato (usando classes)
        return (
           <section id="post-list">
               {this.state.feed.map(post => (
                   <article key={post._id}>{/*precisa colocar uma chave unica quando se utiliza o map*/}
                        <header>
                            <div className="user-info">
                                    <span>{post.author}</span>
                                    <span className='place'>{post.place}</span>
                            </div>
                            {/* <div>

                            </div> */}
                            <img src={more} alt="Mais"/>
                        </header>

                            <img src={`https://backendinstagramdev.herokuapp.com/files/${post.image}`} alt="" />

                        <footer>
                            <div className='actions'>
                                <button type="button" onClick={() => this.handleLike(post._id)}>
                                    <img src={like} alt="" />
                                </button>
                                <img src={comment} alt="" />
                                <img src={send} alt="" />
                            </div>
                            
                            <strong>{post.likes} curtidas</strong>

                            <p>
                                {post.description}
                                <span>{post.hashtags}</span>
                            </p>

                        </footer>
                    </article>
               ) )}
           </section>
        );
    }
}

export default Feed;//exporta minha classe Feed

