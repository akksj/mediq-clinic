# MediQ Clinic

A **real-world MERN** system for a neighborhood clinic in India.

Receptionists still manage walk-ins with paper tokens. Patients still call to ask "is the doctor in?". MediQ replaces that with:

- online appointment booking
- a live token / queue board for the waiting room
- doctor desk for today's list and visit notes
- basic patient history so the clinic is not starting from scratch every visit

Built for **Sarthak Giri** (`akksj`) as a portfolio-grade MERN project — not a todo-list clone.

## Problem

Small clinics typically have:

1. 1–3 doctors
2. a receptionist on a phone
3. walk-in patients mixed with booked patients
4. no shared digital history

That creates double-booked slots, angry waiting rooms, and lost follow-ups.

## What this repo demonstrates

| Layer | Skills shown |
| --- | --- |
| MongoDB | users, doctors, patients, appointments, queue tokens |
| Express | REST API, JWT auth, role-based access |
| React | booking flow, live queue board, doctor desk |
| Node | env config, validation, seed script |

## Roles

- **Patient** — register, book a slot, see token number
- **Reception** — check-in walk-ins, issue tokens, mark no-shows
- **Doctor** — view today's queue, write visit notes, complete visits

## Project structure

```text
mediq-clinic/
  server/          Express + MongoDB API
  client/          React (Vite) front-end
```

## Quick start

### 1. API

```bash
cd server
cp .env.example .env
# set MONGO_URI and JWT_SECRET
npm install
npm run seed
npm run dev
```

API runs on `http://localhost:5000`.

### 2. Client

```bash
cd client
npm install
npm run dev
```

App runs on `http://localhost:5173`.

## Seed logins

After `npm run seed` in `server/`:

| Role | Email | Password |
| --- | --- | --- |
| Doctor | doctor@mediq.local | Password123 |
| Reception | desk@mediq.local | Password123 |
| Patient | patient@mediq.local | Password123 |

## Roadmap (good next commits)

- [ ] SMS / WhatsApp reminder via Twilio or Gupshup
- [ ] Prescription PDF download
- [ ] UPI payment for consultation fee
- [ ] Multi-clinic / multi-doctor calendar
- [ ] Socket.io so the queue board updates without refresh

## Author

Sarthak Giri — MERN stack developer  
GitHub: [akksj](https://github.com/akksj)  
LinkedIn: [sarthak-giri-117490296](https://www.linkedin.com/in/sarthak-giri-117490296)
