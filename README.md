# WorldApp

**WorldApp** е веб апликација за менаџирање на држави и корисници, со автентикација. Backend-от е изработен во Flask (Python) и MongoDB, а frontend-от е во React. Апликацијата е целосно docker-изирана, оркестрирана со Docker Compose и Kubernetes, со автоматски CI/CD pipeline преку GitHub Actions и Deploy на Render cloud.

---

## Технологии и алатки

- **Backend:** [Flask](https://flask.palletsprojects.com/)
- **Frontend:** [React](https://react.dev/)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **Контенеризација:** [Docker](https://www.docker.com/)
- **Оркестрација:** [Docker Compose](https://docs.docker.com/compose/) и [Kubernetes](https://kubernetes.io/)
- **CI/CD:** [GitHub Actions](https://github.com/features/actions)
- **Cloud Deploy:** [Render](https://render.com/)
- **Reverse Proxy:** [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/)
- **IDE:** [PyCharm](https://www.jetbrains.com/pycharm/)
- **Регистар на слики:** [DockerHub](https://hub.docker.com/)

---

## Архитектура

```
Frontend (React) <-> Backend (Flask) <-> Database (MongoDB)
        |                |                   |
   Docker/K8s        Docker/K8s         Docker/K8s
```

- CRUD за држави и корисници, автентикација, REST API
- CI/CD pipeline за автоматизирано билдање и пуштање на Docker имиџи
- Production deploy на Render
