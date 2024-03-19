FROM docker.elastic.co/logstash/logstash:8.12.2

RUN mkdir -p /usr/share/logstash/pipeline/
COPY .env /usr/share/logstash/.env

# RUN chmod 644 /usr/share/logstash/.env

ENV JDBC_CONNECTION_STRING=jdbc:postgresql://34.135.220.2:5432/skillbridge_db

RUN rm -f /usr/share/logstash/pipeline/logstash.conf

COPY pipeline/ /usr/share/logstash/pipeline/
COPY postgresql-42.7.1.jar /usr/share/

EXPOSE 5044

CMD [ "bin/logstash", "-f", "/usr/share/logstash/pipeline/logstash.conf" ]