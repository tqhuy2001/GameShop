from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_hostname: str
    database_port: str
    database_password: str
    database_name: str
    database_username: str
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int
    avatar_users_file_path: str
    games_images_file_path: str
    default_avatar_path: str

    class Config:
        env_file = ".env"


settings = Settings()