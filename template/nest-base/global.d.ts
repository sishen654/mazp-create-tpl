namespace NodeJS {
  interface ProcessEnv {
    // nodemailer 相关配置
    NODEMAILER_HOST: string;
    NODEMAILER_PORT: number;
    NODEMAILER_USER: string;
    NODEMAILER_PASS: string;
    // redis 相关配置
    REDIS_HOST: string;
    REDIS_PORT: number;
    REDIS_DATABASE: number;
    // jwt 相关配置
    JWT_SECRET: string;
    JWT_ACCESS_TOKEN_EXPIRES_TIME: string;
    JWT_REFRESH_TOKEN_EXPIRES_TIME: string;
    // 数据库相关配置
    DATABASE_URL: string;
    // NestJS 相关配置
    NEST_SERVER_PORT: number;
    // 日志相关配置
    WINSTON_LOG_DIRNAME: string;
    WINSTON_LOG_WARN_FILENAME: string;
    WINSTON_LOG_ERROR_FILENAME: string;
    WINSTON_LOG_DATE_PATTERN: string;
    WINSTON_LOG_MAX_SIZE: string;
    WINSTON_LOG_WARN_MAX_FILES: string;
    WINSTON_LOG_ERROR_MAX_FILES: string;
  }
}
