# ver as informações de autor e comitador
git log --pretty=fuller

# faz a substutuição
git filter-branch -f --commit-filter '
if [ "$GIT_AUTHOR_EMAIL" = "contato@outroemail.com.br" ]; 
then 
    GIT_AUTHOR_NAME="Ricardo Pereira"; 
    GIT_AUTHOR_EMAIL="contato@ricardopdias.com.br";
    GIT_COMMITTER_NAME="Ricardo Pereira";
    GIT_COMMITTER_EMAIL="contato@ricardopdias.com.br";
    git commit-tree "$@";
else
    git commit-tree "$@";
fi
' HEAD;

# ver as informações de autor e comitador
git log --pretty=fuller

# sincroniza a nova estrutura de commits com o repo remoto
git push --force


