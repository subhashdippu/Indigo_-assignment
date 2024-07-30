
import pika
import json
from django.conf import settings
from .models import Flight
from firebase_admin import messaging


def send_notification(subscription, message):
    try:
        message = messaging.Message(
            notification=messaging.Notification(
                title='Flight Status Update',
                body=message,
            ),
            token=subscription['firebase_token'],
        )
        response = messaging.send(message)
        print('Successfully sent message:', response)
    except Exception as e:
        print('Error sending message:', e)


def process_message(ch, method, properties, body):
    data = json.loads(body)
    flight_id = data.get('flight_id')
    status = data.get('status')
    gate = data.get('gate')
    delay = data.get('delay')

    subscriptions = subscriptions_collection.find({"flight_id": flight_id})
    message = f"Flight {flight_id} status update: {status}, Gate: {gate}, Delay: {delay}"

    for subscription in subscriptions:
        send_notification(subscription, message)


connection = pika.BlockingConnection(pika.URLParameters(settings.RABBITMQ_URL))
channel = connection.channel()
channel.queue_declare(queue='flight_updates')

channel.basic_consume(queue='flight_updates',
                      on_message_callback=process_message, auto_ack=True)
channel.start_consuming()
