import { useEffect, useState } from "react";
import styles from './ReposList.module.css';

const ReposList = ({ nomeUsuario }) => {
    const [repos, setRepos] = useState([]);
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [err, setErr] = useState("");

    useEffect(() => {
        setEstaCarregando(true);
        setErr("");
        setRepos([]);

        const timerPromise = fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
            .then(res => {
                if (!res.ok) {
                    if (res.status === 404) {
                        throw new Error("Perfil do GitHub não encontrado.");
                    }
                    throw new Error("Ocorreu um erro ao buscar os repositórios.");
                }
                return res.json();
            })
            .then(resJson => {
                const timer = setTimeout(() => {
                    setRepos(resJson);
                    setEstaCarregando(false);
                }, 1000);

                return timer;
            })
            .catch(e => {
                setErr(e.message);
                setEstaCarregando(false);
            });

        return () => {
            timerPromise.then(timer => {
                if (timer) clearTimeout(timer);
            });
        };
    }, [nomeUsuario]);

    return (
        <div className="container">
            {estaCarregando ? (
                <h1>Carregando...</h1>
            ) : err ? (
                <h2>{err}</h2>
            ) : (
                <ul className={styles.list}>
                    {repos.map(({ id, name, language, html_url }) => (
                        <li className={styles.listItem} key={id}>
                            <div className={styles.itemName}>
                                <b>Nome:</b> {name}
                            </div>
                            <div className={styles.itemLanguage}>
                                <b>Linguagem:</b> {language}
                            </div>
                            <a
                                className={styles.itemLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                href={html_url}
                            >
                                Visitar no GitHub
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReposList;