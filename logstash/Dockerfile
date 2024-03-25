# To run an image: docker run --env-file logstash.env <image_name>
FROM docker.elastic.co/logstash/logstash:8.12.2

RUN mkdir -p /usr/share/logstash/pipeline/
COPY logstash.env /etc/default/logstash/

# RUN chmod 644 /usr/share/logstash/.env

RUN rm -f /usr/share/logstash/pipeline/logstash.conf

COPY pipeline/ /usr/share/logstash/pipeline/
COPY postgresql-42.7.1.jar /usr/share/

EXPOSE 5044

CMD [ "bin/logstash", "-f", "/usr/share/logstash/pipeline/logstash.conf" ]