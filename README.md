# MediQ Clinic

MERN clinic desk for a neighborhood doctor: online appointments, walk-in tokens, and a doctor list with visit notes.

Reception still mixes booked patients and walk-ins on paper. MediQ keeps one queue so a slot is not given twice.

## What works

- Patient register and login (JWT, bcrypt)
- Book a doctor slot with a clash check
- Reception check-in that issues the next token
- Doctor desk can update only that doctor's appointments
- Public register always creates a patient. Staff accounts come from `npm run seed`.
- Waiting-room board refreshes every 10 seconds

## What is not done

- No SMS, prescription PDF, or UPI
- Runs locally. Not deployed.
- The slot unique index is partial (active statuses only). Drop the old index once if a database was seeded before this change: `db.appointments.dropIndex("doctor_1_date_1_slot_1")`

## Stack

MongoDB · Express · React (Vite) · Node.js · JWT

## Run

```bash
cd server
cp .env.example .env
npm install
npm run seed
npm run dev
```

```bash
cd client
npm install
npm run dev
```

API `http://localhost:5000` · client `http://localhost:5173`

| Role | Email | Password |
| --- | --- | --- |
| Doctor | doctor@mediq.local | Password123 |
| Reception | desk@mediq.local | Password123 |
| Patient | patient@mediq.local | Password123 |

## Author

Sarthak Giri · [github.com/akksj](https://github.com/akksj) · [LinkedIn](https://www.linkedin.com/in/sarthak-giri-117490296)
