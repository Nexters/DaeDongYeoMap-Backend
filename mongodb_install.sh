#!/bin/bash

#os check
check_os=`sudo cat /etc/os-release | head -n 1 |  awk -F"[\"]" '{print $2}'`
if [ "$check_os" == "CentOS Linux" ]; then
        os_version='rhel70'
else
        os_version='ubuntu1604'
fi

mongo_version='4.0.3'
default_path='/home/mongodb'
folder_name='mongodb-linux-x86_64-'$os_version'-'$mongo_version
tgz_name=$folder_name'.tgz'

# 1. add mongodb user
useradd -m -d /home/mongodb mongodb

# 2. install packages
# if centos
if [ "$os_version" == "rhel70" ]; then
	sudo yum -y install numactl
# if ubuntu
else
	apt-get -y update
	apt install -y numactl
	apt-get install -y libcurl4-openssl-dev
fi

# execute in mongodb
sudo -u mongodb bash <<EOF
# make default directory
cd $default_path
mkdir db db/log db/data db/config db/configdata
# 3. get mongodb source
wget https://fastdl.mongodb.org/linux/$tgz_name -P $default_path
tar xvfz $tgz_name -C $default_path/db
mv db/$folder_name db/mongodb
# add env
echo 'export MONGODB_HOME=/home/mongodb/db/mongodb' >> /home/mongodb/.bashrc
echo 'export PATH=$PATH:/home/mongodb/db/mongodb/bin' >> /home/mongodb/.bashrc
source /home/mongodb/.bashrc
echo 'systemLog:
   destination: file
   path: "/home/mongodb/db/log/mongod.log"
   logAppend: true
   logRotate: rename
storage:
   engine: wiredTiger
   directoryPerDB: true
   wiredTiger:
      engineConfig:
         journalCompressor: snappy
      collectionConfig:
         blockCompressor: snappy
      indexConfig:
         prefixCompression: true
   dbPath: "/home/mongodb/db/data"
   journal:
      enabled: true
      commitIntervalMs: 300
processManagement:
   fork: true
   pidFilePath: "/tmp/mongod.pid"
net:
   port: 27017
   bindIpAll: true
   maxIncomingConnections: 20000
   unixDomainSocket:
      enabled: false
setParameter:
  failIndexKeyTooLong: false
security:
  authorization: enabled' >>$default_path/db/config/mongod.conf
touch $default_path/db/config/mongos.conf
touch $default_path/db/config/configserver.conf
numactl --interleave=all /home/mongodb/db/mongodb/bin/mongod -f /home/mongodb/db/config/mongod.conf  &
EOF

#if centos
if [ "$os_version" == "rhel70" ]; then
	echo 'sleep 5
sudo -u mongodb bash <<EOF
  numactl --interleave=all  /home/mongodb/db/mongodb/bin/mongod -f /home/mongodb/db/config/mongod.conf  &
  # numactl --interleave=all  /home/mongodb/db/mongodb/bin/mongod -f /home/mongodb/db/config/configserver.conf  &
  # numactl --interleave=all  /home/mongodb/db/mongodb/bin/mongos -f /home/mongodb/db/config/mongos.conf  &
EOF
exit 0' >> /etc/rc.d/rc.local

#if ubuntu
else
	# add command to rc.local
	sed -i s/'exit 0'// /etc/rc.local

	echo 'sleep 5
sudo -u mongodb bash <<EOF
  numactl --interleave=all  /home/mongodb/db/mongodb/bin/mongod -f /home/mongodb/db/config/mongod.conf  &
  # numactl --interleave=all  /home/mongodb/db/mongodb/bin/mongod -f /home/mongodb/db/config/configserver.conf  &
  # numactl --interleave=all  /home/mongodb/db/mongodb/bin/mongos -f /home/mongodb/db/config/mongos.conf  &
EOF
exit 0' >> /etc/rc.local
fi