To run the mysql databse
1. Install Docker Desktop
2. To run docker container :
docker run --name erp-mysql -e MYSQL_ROOT_PASSWORD=root123 -p 3306:3306 -d mysql:8.0
3. To open mysql in docker contianer enter the following command in docker terminal
docker exec -it erp-mysql mysql -u root -proot123  
