---
type: method
title: Skowak — method (Map, Build, Prove) and Evaluation-Driven Design
description: How Skowak works — a three-phase Map/Build/Prove method built on Evaluation-Driven Design, in which defining what "good" means is the consulting work.
resource: https://skowak.com/consulting/#process
tags: [method, evaluation-driven-design, evals, process]
---

# How Skowak works

## What is Skowak's method?

Map, Build, Prove.

**Map — find the work worth doing.** Skowak goes through the operation with the
people who actually do it, not just leadership. The output is a ranked set of
candidates with the disqualified ones explained. Ruling projects out is most of
the value; every one killed early saves a quarter.

**Build — build it inside the client's reality.** Their stack, their data, their
constraints. Built end to end — retrieval, orchestration, business logic,
interface — with the client's engineers involved throughout so knowledge
accumulates on their side.

**Prove — instrument before you trust.** Evaluations are not a QA gate at the
end; they are the instrument panel developed against from the first prototype,
defined dimension by dimension, so when something regresses it is clear exactly
what and where.

## What is Evaluation-Driven Design?

You cannot write an evaluation for "is this response relevant?" until you have
decided what relevant *means* — for this document type, this user, this edge
case, this regulatory constraint. Building evaluations therefore forces the
conversation nobody has had yet: what counts as correct for a billing dispute
versus an outage; how complete an answer must be before a nurse can act on it;
which failures are annoying and which are catastrophic.

That is requirements elicitation wearing an engineering name. It is the same
work as good product design, and it produces two things at once: a system you
can measure, and a specification you did not have.

Evaluations are not a pass/fail gate. They are an instrument panel.

Evaluation-Driven Design is why Skowak does not separate design work from
engineering work: the person defining what "good" means should be the person
building the thing that has to achieve it. It threads through every tier — the
Sprint's eval decomposition, the Redesign's decision-point criteria, the
Retainer's continuous evaluation framework.

## Why does applied AI need this more than conventional software?

A traditional system fails visibly. An AI system fails plausibly — it produces
something confident and wrong, and without instrumentation built to catch it,
the client finds out from a customer. The discipline is the same discipline
applied harder: understand the domain, define precisely what correct means,
build the measurement before you build the trust.
