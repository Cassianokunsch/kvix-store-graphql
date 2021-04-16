if [ $NODE_ENV == "development" ]; then
    yarn start:dev
else
    yarn start:prod
fi