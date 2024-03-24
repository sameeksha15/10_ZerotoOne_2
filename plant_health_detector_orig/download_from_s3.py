import boto3
import botocore
# import uuid
from dotenv import load_dotenv
from pathlib import Path
import os
from flask import jsonify

def get_env():
    secrets = {}
    load_dotenv()
    env_path = Path('.')/'.env'
    load_dotenv(dotenv_path=env_path)

    secrets["BUCKET_NAME"] = os.getenv("BUCKET_NAME")
    secrets["AWS_ACCESS_KEY_ID"] = os.getenv("AWS_ACCESS_KEY_ID")
    secrets["AWS_SECRET_ACCESS_KEY"] = os.getenv("AWS_SECRET_ACCESS_KEY")
    return secrets

def get_file(KEY):
    secrets = get_env()

    s3 = boto3.client('s3')

    s3 = boto3.resource(
        service_name='s3',
        region_name='ap-south-1',
        aws_access_key_id=secrets["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=secrets["AWS_SECRET_ACCESS_KEY"]
    )

    try:
        s3.Bucket(secrets["BUCKET_NAME"]).download_file(KEY, f'files/{KEY}')
        return True
    except botocore.exceptions.ClientError as e:
        if e.response['Error']['Code'] == "404":
            return False
        else:
            raise