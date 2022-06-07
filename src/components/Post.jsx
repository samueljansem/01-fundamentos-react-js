import { useState } from 'react';
import { Comment } from './Comment';
import { Avatar } from './Avatar';

import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './Post.module.css';

export function Post({ author, content, publishedAt }) {
    const [comments, setComments] = useState(['Post muito bacana']);
    const [newComment, setNewComment] = useState('');

    const publishedDateFormatted = format(
        publishedAt,
        "d 'de' LLLL 'às' HH:mm'h'",
        { locale: ptBR }
    );

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: 'há',
    });

    function handleCreateNewComment(event) {
        event.preventDefault();

        setComments([...comments, newComment]);

        setNewComment('');
    }

    function handleNewCommentChange(event) {
        setNewComment(event.target.value);

        event.target.setCustomValidity(
            event.target.value === '' ? 'Este campo é obrigatório' : ''
        );
    }

    function deleteComment(comment) {
        const newCommentsList = comments.filter((item) => item != comment);
        setComments(newCommentsList);
    }

    function handleNewCommentInvalid() {
        event.target.setCustomValidity('Este campo é obrigatório');
    }

    const isNewCommentEmpty = newComment === '';

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                <time
                    title={publishedDateFormatted}
                    dateTime={publishedAt.toISOString()}
                >
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {content.map((line) => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>;
                    } else if (line.type === 'link') {
                        return (
                            <p key={line.content}>
                                <a href="#">{line.content}</a>
                            </p>
                        );
                    }
                })}
            </div>

            <form
                onSubmit={handleCreateNewComment}
                className={styles.commentForm}
            >
                <textarea
                    onChange={handleNewCommentChange}
                    value={newComment}
                    name="comment"
                    placeholder="Deixe um comentário"
                    onInvalid={handleNewCommentInvalid}
                    required
                />
                <footer>
                    <button disabled={isNewCommentEmpty} type="submit">
                        Publicar
                    </button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map((comment) => {
                    return (
                        <Comment
                            key={comment}
                            content={comment}
                            onDeleteComment={deleteComment}
                        />
                    );
                })}
            </div>
        </article>
    );
}
