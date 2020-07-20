// Doctor Routes

// DB setup: 1 doctor
test('Doctor: should create sessions', async () => {
  const response = await request;
});

// DB setup: 1 doctor & 1 session
test('Doctor: should delete session', async () => {
  const response = await request;
});

// DB setup: 1 doctor & many sessions booked by different clients
test('Doctor: should get sessions', async () => {
  const response = await request;
});

// DB setup: 1 doctor & many sessions booked by different clients
test('Doctor: should get clients', async () => {
  const response = await request;
});

// DB setup: 1 doctor & many sessions booked by different clients
test('Doctor: should get one client', async () => {
  const response = await request;
});

// Client Routes

// DB setup: 1 client
test('Client: should book session', async () => {
  const response = await request;
});

// DB setup: 1 client & many sessions booked with different doctors
test('Client: should get sessions', async () => {
  const response = await request;
});

// DB setup: 1 client & 1 session
test('Client: should update session', async () => {
  const response = await request;
});

// DB setup: 1 client & 1 session
test('Client: should cancel session', async () => {
  const response = await request;
});
