from kafka import KafkaConsumer
import json
from django.conf import settings
from .models import Flight
from firebase_admin import messaging

consumer = KafkaConsumer(
    'flight_updates',
    bootstrap_servers=[settings.KAFKA_BROKER_URL],
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    group_id='flight-status-group',
    value_deserializer=lambda x: json.loads(x.decode('utf-8'))
)


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


for message in consumer:
    data = message.value
    flight_id = data.get('flight_id')
    status = data.get('status')
    gate = data.get('gate')
    delay = data.get('delay')

    subscriptions = subscriptions_collection.find({"flight_id": flight_id})
    message = f"Flight {flight_id} status update: {status}, Gate: {gate}, Delay: {delay}"

    for subscription in subscriptions:
        send_notification(subscription, message)
