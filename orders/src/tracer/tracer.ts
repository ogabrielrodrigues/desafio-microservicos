import { trace } from "@opentelemetry/api";

if (!process.env.OTEL_SERVICE_NAME) {
  throw new Error("OTEL_SERVICE_NAME environment variable is not set. Please set it to the name of your service.")
}

export const tracer = trace.getTracer(process.env.OTEL_SERVICE_NAME, process.env.OTEL_SERVICE_VERSION || "1.0.0");