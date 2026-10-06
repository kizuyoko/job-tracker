create policy "users manage own interviews"
on interviews
for all
to authenticated
using (
  exists (
    select 1 from applications a
    where a.id = interviews.application_id
      and a.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from applications a
    where a.id = interviews.application_id
      and a.user_id = auth.uid()
  )
);