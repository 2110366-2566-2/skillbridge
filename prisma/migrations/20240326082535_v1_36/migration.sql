-- This is an empty migration.
-- AddTrigger
CREATE OR REPLACE FUNCTION create_application_status_log()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO application_status_log (id, "applicationUserId", "applicationJobId", status, "updatedAt")
  VALUES (uuid_generate_v4(), NEW."userId", NEW."jobId", NEW.status, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER log_application_insert
AFTER INSERT ON application
FOR EACH ROW
EXECUTE PROCEDURE create_application_status_log();
