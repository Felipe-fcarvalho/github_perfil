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

        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
            .then(res => {
                if (!res.ok) {
                    if (res.status === 404) {
                        throw new Error("Perfil fo Github não encontrado.");
                    }
                    throw new Error("Ocorreu um erro ao buscar os repositórios.");
                }
                return res.json();
            })
            .then(resJson => {
                setTimeout(() => {
                    setRepos(resJson);
                    setEstaCarregando(false);
                }, 1000);
            })
            .catch(e => {
                setErro(e.message);
                setEstaCarregando(false);
            })
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
                                <b>Nome:</b>
                                {name}
                            </div>
                            <div className={styles.itemLanguage}>
                                <b>Linguagem:</b>
                                {language}
                            </div>
                            <a
                                className={styles.itemLink}
                                target="_blank"
                                href={html_url}>Visitar no Github
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default ReposList;