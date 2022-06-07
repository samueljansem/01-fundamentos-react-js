import styles from './Post.module.css';
import { Comment } from './Comment';

export function Post() {
    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <img className={styles.avatar} src='https://github.com/samueljansem.png' />
                    <div className={styles.authorInfo}>
                        <strong>Samuel Jansem</strong>
                        <span>Fullstack Developer</span>
                    </div>
                </div>
                <time title='06 de Junho às 22:27' dateTime='2022-06-06 22:27'>
                    Publicado há 1h
                </time>
            </header>

            <div className={styles.content}>
                <p>Fala galera! 🙌</p>
                <p>Acabei de subir mais um projeto no meu portfolio, se puderem dar uma olhada.</p>
                <p>Me ajudaria muito pois como estou começando, quaisquer dicas ajudam muito!</p>
                <p>
                    👉&nbsp;
                    <a href='#'>github.com/samueljansem/mais-um-projeto/</a>
                </p>
                <p>
                    <a href='#'>#nlw</a>&nbsp;
                    <a href='#'>#vamosla</a>
                </p>
            </div>

            <form className={styles.commentForm}>
                <textarea placeholder='Deixe um comentário' />
                <footer>
                    <button type='submit'>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                <Comment />
                <Comment />
                <Comment />
            </div>
        </article>
    );
}
