# git branch 관리

> feature 브랜치(feature/login)를 'develop' 브랜치('master' 브랜치에서 따는 것이 아니다!)에서 분기

```bash
$ git checkout -b feature/login develop
```



- 새로운 기능에 대한 작업 수행 

- feature 브랜치에서 모든 작업이 끝나면 add/commit

-  'develop' 브랜치로 이동한다.

  ```bash
  $ git checkout develop
  ```

- 'develop' 브랜치에 feature/login 브랜치 내용을 병합(merge)한다.

  ```bash
  $ git merge feature/login
  ```

  ```bash
  $ git merge --no-ff feature/login
  // commit이 여러개일 때 commit을 하나로 통합하여 merge하고 싶은 경우
  ```

- -d 옵션: feature/login에 해당하는 브랜치를 삭제한다.

  ```bash
  $ git branch -d feature/login
  ```

- develop' 브랜치를 원격 중앙 저장소에 올린다.

  ```bash
  $ git push origin develop
  ```




  https://gmlwjd9405.github.io/2018/05/11/types-of-git-branch.html

