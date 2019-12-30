if [ $NODE_ENV == "development" ]; then
    yarn start:watch
else
    yarn start
fi