##  GIT基本操作流程

`git init` :初始化 git 仓库

`git add test.js`,把 test.js 添加到仓库 

### add

`git add .` 把所有文件添加到暂存区

`git add -u .` u指update，将工作区的被修改的文件和被删除的文件提交到暂存区，不包括新增的文件

`git add -A .` A指all，将工作区被修改、被删除、新增的文件都提交到暂存区

### status

`git status [file-name]` 查看指定文件状态

`git status` 查看所有文件状态

### commit

`git commit -m [massage]` 将暂存区所有文件添加到本地仓库

`git commit [file-name-1] [file-name-2] -m [massage]` 将暂存区指定文件添加到本地仓库

### log

git log 显示所有commit日志

 将日志缩写为单行显示

git log --graph --pretty=oneline --abbrev-commit 查看分支合并情况

git log --oneline --decorate --graph --all 查看分叉历史，包括：提交历史、各个分支的指向以及项目的分支分叉情况。

git log -3 查看最新3条commit日志数据

### reflog

`git reflog` 显示操作本地版本库的命令，包括commit和reset等，在回退版本以后又后悔找不到commit id了可以使用此命令查看历史

### push

`git push` 将文件添加到远程仓库

`git push -f` 强制提交，当我们本地reset到旧的版本时，然后普通push会被拦截，因为此是本地HEAD指向比远程库还要旧

`git push origin [branch-name]` 推送当前本地分支到指定远程分支

### rm

`git rm --cached [file-name]` 删除暂存区的文件

`git rm -rf .` 不但删除所有暂存区的文件，还删除所有工作区的物理文件

### reset（当对整个版本进行操作）

git reset --{soft|(mixed)|hard} HEAD

--soft 其中可选参数soft表示单纯的切换HEAD指向的commit-id

--mixed 默认值mixed参数表示先执行上面一步，然后再将commit-id里面的内容更新到暂存区

--hard hard表示先执行上面两步，然后再将暂存区内容同步到工作区

git reset --hard HEAD^^ 用上两个版本里的所有文件撤回到暂工作区

git reset --hard [commit id] 用指定版本的所有文件撤回到工作区

### checkout(分支)

`git checkout [branch]` 切换分支

`git checkout -b [new-branch-name]` 创建并切换分支

### branch（分支）

git branch [branch-name] 创建分支

查看当前分支

git branch

git branch -a 查看本地和远程的所有分支

git branch -r 查看远程所有分支

git branch -d [branch-name]   删除一个分支

git branch -D [branch-name]  强制删除一个没有合并的分支

git branch --set-upstream-to=origin/[branch-name] [branch-name] 把本地分支和远程分支进行连接

### merge（分支）

git merge 合并本地origin/[branch-name]和HEAD->[branch-name]的代码，并同步到工作空间

git merge [branch-name] 用于合并指定分支到当前分支

git merge --quit 退出当前分支合并，当合并后冲突很多，要撤回合并分支就可以用这个命令

git merge --no-ff -m [massage] [branch-name] 不使用Fast forward合并分支，这样会创建新的commit，所以需要massage。这样被合并的分支HEAD指向是会变的。

如果使用了Fast forward方式合并分支，那么删除次要分支的时候历史分支记录也会被删除，这样就无法追寻分支合拼信息了。

### switch（分支）

`git switch -c [branch-name]` 创建新分支并切换到该分支

`git switch [branch-name]` 切换到已有分支

### remote（关联仓库）

git remote add origin 远程地址 关联远程仓库

git remote 查看本地添加了哪些远程分支地址

git remote -v 查看本地添加了哪些远程分支地址更详细信息

git remote remove origin 删除本地指定的远程地址

### fetch（远程仓库）

git fetch` 拉取远程分支最新的commit到本地仓库的`origin/[branch-name]

### pull（远程仓库）

`git pull` 从远程仓库拉取代码到工作空间

**pull 和 fetch的关系**

- `git pull` == `git fetch` + `git merge`

### clone



## 远程同步

> ```bash
> # 下载远程仓库的所有变动
> $ git fetch [remote]
> # 显示所有远程仓库
> $ git remote -v
> # 显示某个远程仓库的信息
> $ git remote show [remote]
> # 增加一个新的远程仓库，并命名
> $ git remote add [shortname] [url]
> # 取回远程仓库的变化，并与本地分支合并
> $ git pull [remote] [branch]
> # 上传本地指定分支到远程仓库
> $ git push [remote] [branch]
> # 强行推送当前分支到远程仓库，即使有冲突
> $ git push [remote] --force
> # 推送所有分支到远程仓库
> ```

# 	

# 团队协作

有两个角色：管理者、开发者

先在git远程库上创建自己的

克隆分支代码：

git clone http://8.135.123.224/zx-backend-dev/pjoy_backend.git

建立工作分支：与远程分支名称一样

git checkout -b branch_name [基于某个分支：省略表示基于本分支]
日常开发提交代码：

git add 文件1路径 文件2路径。。。

git commit -m "提交描述"

git push origin 分支名称（线上分支和当前分支名称相同） 在这一步可能发生冲突

## **发起合并请求：**

**在git网址上操作**



## 忽略文件

进入项目根目录touch  .gitignore（创建.gitignore文件）

vim .gitignore 进入文件

配置需要忽略文件   

```
vue项目git忽略
.DS_Store 忽略.DS_Store
node_modules 忽略当前目录下的node_modules文件
/dist
```

