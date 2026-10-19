alter table interviews
  add column activity_type text not null default 'Interview I'
  check (activity_type in (
    'Interview I',
    'Interview II',
    'Interview III',
    'Interview IV',
    'Got calling',
    'Got mail',
    'Other'
  ));