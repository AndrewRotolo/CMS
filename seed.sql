USE cms_db;

INSERT INTO departments (department_name)
VALUES
        ('management'),
        ('HR'),
        ('legal');

INSERT INTO roles (title, salary, department_id)
VALUES
        ('Lead supervisor', 75000, 1),
        ('HR Lead', 65000, 2),
        ('Data entry specialist', 35000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
        ('John', 'Smith', 4, null),
        ('Jane', 'Doe', 5, 1),
        ('Kip', 'Guile', 6, 1);